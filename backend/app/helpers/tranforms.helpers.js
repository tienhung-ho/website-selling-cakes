

module.exports.transformData = (data) => {
  const result = [];

  // Lặp qua mỗi dòng dữ liệu
  data.forEach(item => {
      // Tách title và option từ chuỗi dữ liệu
      const [title, option] = item.split('-');

      // Tìm xem có đối tượng nào trong result có title tương tự không
      const existingItem = result.find(item => item.title === title);

      // Nếu chưa có đối tượng nào có title tương tự trong result, thêm mới một đối tượng
      if (!existingItem) {
          result.push({ title: title, options: [option.trim()] });
      } else {
          // Nếu đã có đối tượng có title tương tự, thêm option vào mảng options của đối tượng đó
          existingItem.options.push(option.trim());
      }
  });

  return result;
}


