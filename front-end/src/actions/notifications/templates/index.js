export const getNotificationsTemplates = async ({withMeta = false} = {}) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/notifications/templates`);

  const response = await data.json();
  if (withMeta) {
    return response;
  }

  return response;
};
