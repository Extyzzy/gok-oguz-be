import connectionSource from './config/typeorm.cli';

async function testConnection() {
  try {
    await connectionSource.initialize();
    console.log('✅ Connection successful!');
    await connectionSource.destroy();
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();
