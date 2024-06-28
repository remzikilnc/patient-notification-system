export const getNotificationsTemplate = async id => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notifications/templates/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.json();
};
