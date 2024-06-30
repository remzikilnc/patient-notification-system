export const disableButton = (setDisabled, duration = 5000) => {
  setDisabled(true);
  setTimeout(() => {
    setDisabled(false);
  }, duration);
};