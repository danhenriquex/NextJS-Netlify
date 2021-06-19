// functions/guides.ts
exports.handler = async (event, context) => {
  const guides = [
    {title: "Beat all Zelda Bosses like a Boss", author: "mario"},
    {title: "Mario kart Shortcuts You Never Knew Existed", author: "luigi"},
    {title: "Ultimate Street Fighter Guide", author: "chu-li"}
  ];
  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides)
    };
  }
  return {
    statusCode: 401,
    body: JSON.stringify({
      msg: "aaa, ah you must be logged in to see this  "
    })
  };
};
//# sourceMappingURL=guides.js.map
