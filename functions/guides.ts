import React from "react";

exports.handler = async (event: any, context: any) => {
  const guides = [
    { title: "Beat all Zelda Bosses like a Boss", author: "mario" },
    { title: "Mario kart Shortcuts You Never Knew Existed", author: "luigi" },
    { title: "Ultimate Street Fighter Guide", author: "chu-li" },
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(guides),
  };
};
