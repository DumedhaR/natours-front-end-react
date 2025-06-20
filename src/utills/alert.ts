
export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.remove();
  };
  
  export const showAlert = (type: 'success' | 'error', msg: string, time = 6) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.body.insertAdjacentHTML('afterbegin', markup);
    setTimeout(hideAlert, time * 1000);
  };
  