import prisma from './client.js';

async function main() {
  // 清空现有数据
  await prisma.sysUser.deleteMany();

  // 创建测试用户数据
  const user1 = await prisma.sysUser.create({
    data: {
      phone: '13800138000',
      email: 'zhangsan@example.com',
      password: 'hashed_password_123',
      receive_address: '北京市朝阳区建国门外大街1号',
    },
  });

  const user2 = await prisma.sysUser.create({
    data: {
      phone: '13900139000',
      email: 'lisi@example.com',
      password: 'hashed_password_456',
      receive_address: '上海市浦东新区陆家嘴环路2号',
    },
  });

  const user3 = await prisma.sysUser.create({
    data: {
      phone: '13700137000',
      email: null, // 测试email为null的情况
      password: 'hashed_password_789',
      receive_address: null, // 测试地址为null的情况
    },
  });

  const user4 = await prisma.sysUser.create({
    data: {
      phone: '13600136000',
      email: 'wangwu@example.com',
      password: 'hashed_password_abc',
      receive_address: '广州市天河区珠江新城3号',
    },
  });

  console.log('创建的用户数据:', { user1, user2, user3, user4 });

  // 清空现有商品数据
  await prisma.product.deleteMany();

  // 创建测试商品数据
  const product1 = await prisma.product.create({
    data: {
      category_id: 1,
      product_name: 'iPhone 17 Pro Max',
      product_img: 'https://images.pexels.com/photos/34624326/pexels-photo-34624326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: 7999.00,
      stock: 50,
      description: '苹果iPhone 17 Pro Max，搭载A19 Pro芯片',
      status: 1,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      category_id: 1,
      product_name: 'MacBook Air M4',
      product_img: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: 8999.00,
      stock: 30,
      description: '苹果MacBook Air，M2芯片，13.6英寸',
      status: 1,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      category_id: 4,
      product_name: 'Nike Air Max 270',
      product_img: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      price: 899.00,
      stock: 100,
      description: '耐克Air Max 270运动鞋，舒适透气',
      status: 1,
    },
  });

  const product4 = await prisma.product.create({
    data: {
      category_id: 1,
      product_name: 'Sony WH-1000XM5',
      product_img: 'https://images.pexels.com/photos/815494/pexels-photo-815494.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      price: 2399.00,
      stock: 25,
      description: '索尼降噪耳机WH-1000XM5，顶级降噪体验',
      status: 0, // 下架状态
    },
  });

  console.log('创建的商品数据:', { product1, product2, product3, product4 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });