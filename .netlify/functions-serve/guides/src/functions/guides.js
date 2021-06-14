// functions/guides.ts
exports.handler = async (event, context) => {
  const guides = [
    {title: "Beat all Zelda Bosses like a Boss", author: "mario"},
    {title: "Mario kart Shortcuts You Never Knew Existed", author: "luigi"},
    {title: "Ultimate Street Fighter Guide", author: "chu-li"}
  ];
  return {
    statusCode: 200,
    body: JSON.stringify(guides)
  };
};
//# sourceMappingURL=guides.js.map
