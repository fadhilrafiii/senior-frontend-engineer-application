export const parse = (data?: string | null) => {
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);

    return parsed;
  } catch (_error) {
    return data;
  }
};
