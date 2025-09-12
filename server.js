import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import TelegramBot from 'node-telegram-bot-api';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import exceljs from 'exceljs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Telegram Bot Setup
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

// Listen for REPORT command
bot.onText(/\/report/, async (msg) => {
  const chatId = msg.chat.id;
  
  try {
    // Get all orders from Firebase
    const ordersSnapshot = await db.collection('orders').get();
    
    if (ordersSnapshot.empty) {
      bot.sendMessage(chatId, 'No orders found in the database.');
      return;
    }
    
    const orders = [];
    ordersSnapshot.forEach(doc => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Create Excel workbook
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Orders');
    
    // Add headers
    worksheet.columns = [
      { header: 'Order Date', key: 'date', width: 20 },
      { header: 'Customer', key: 'customer', width: 25 },
      { header: 'Phone', key: 'phone', width: 20 },
      { header: 'City', key: 'city', width: 20 },
      { header: 'Village', key: 'village', width: 20 },
      { header: 'Message', key: 'message', width: 40 },
      { header: 'Items', key: 'items', width: 60 },
      { header: 'Total', key: 'total', width: 15 }
    ];
    
    // Add rows
    orders.forEach(order => {
      const itemsString = order.items.map(item => 
        `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');
      
      worksheet.addRow({
        date: order.createdAt.toDate().toLocaleString(),
        customer: order.fullName,
        phone: order.phone,
        city: order.city,
        village: order.village,
        message: order.message || 'N/A',
        items: itemsString,
        total: `$${order.total.toFixed(2)}`
      });
    });
    
    // Style header row
    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
    });
    
    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    
    // Send to Telegram
    if (process.env.TELEGRAM_CHAT_ID) {
       await bot.sendDocument(process.env.TELEGRAM_CHAT_ID, buffer, {}, {
      filename: `orders-report-${new Date().toISOString().slice(0, 10)}.xlsx`,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
         await bot.sendDocument(process.env.TELEGRAM_CHAT_ID2, buffer, {}, {
      filename: `orders-report-${new Date().toISOString().slice(0, 10)}.xlsx`,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });
    }
    
  } catch (error) {
    console.error('Error generating report:', error);
    bot.sendMessage(chatId, 'Failed to generate report. Please try again later.');
  }
});

// Order Endpoint
app.post('/api/orders', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Create order object with timestamp
    const order = {
      fullName: orderData.fullName,
      phone: orderData.phone,
      message: orderData.message || '',
      village: orderData.village,
      city: orderData.city,
      items: orderData.items,
      total: orderData.total,
      createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };
    
    // Save to Firebase
    const docRef = await db.collection('orders').add(order);
    console.log(`Order saved with ID: ${docRef.id}`);
    
    // Format Telegram message
    let message = `🛒 *New Order Received!* 🛒\n\n`;
    message += `👤 *Customer:* ${orderData.fullName}\n`;
    message += `📱 *Phone:* ${orderData.phone}\n`;
    message += `Location: ${orderData.city}, ${orderData.village}`
    if (orderData.message) {
      message += `💬 *Message:* ${orderData.message}\n`;
    }
    
    message += `\n📋 *Order Items:*\n`;
    orderData.items.forEach(item => {
      message += `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n💰 *Total Amount:* $${orderData.total.toFixed(2)}\n`;
    message += `\n_Order received at ${new Date().toLocaleString()}_`;
    message += `\n\nSend /report to get all orders`;
    
    // Send to Telegram
    if (process.env.TELEGRAM_CHAT_ID || process.env.TELEGRAM_CHAT_ID2 ) {
      await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
      await bot.sendMessage(process.env.TELEGRAM_CHAT_ID2, message, { parse_mode: 'Markdown' });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Order placed successfully!',
      orderId: docRef.id
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

// Get all orders (for debugging)
app.get('/api/orders', async (req, res) => {
  try {
    const ordersSnapshot = await db.collection('orders').get();
    const orders = [];
    
    ordersSnapshot.forEach(doc => {
      orders.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      });
    });
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});