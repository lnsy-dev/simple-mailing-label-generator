/*
  
  EASY FORM
  by LNSY
  lnsy.studio

*/


class EasyForm extends HTMLElement {
  connectedCallback(){
    const submit = this.querySelector('input[type="submit"');
    if(submit !== null){
      submit.addEventListener('click', (e)=>{
        e.preventDefault(); 
        const values = this.getFormValues();
        this.dispatchEvent(new CustomEvent('submit', {detail: values}))
      })
    }
  }

  getFormValues(){
    let values = {};
    [...this.querySelectorAll('input')].forEach(el => {
      if(el.name === "" && el.type !== 'submit') return console.error('All inputs need an Name attribute');
      switch(el.type){
      case "submit":
        break;
      case "number":
      case "range":
        values[el.name] = Number(el.value);
        break;
      case "checkbox":
        values[el.name] = el.checked;
        break;
      case "text":
      default:
        values[el.name] = el.value;
      }
    });


    [...this.querySelectorAll('textarea')].forEach(el => {
      if(el.name === "") return console.error("All inputs require an name attribute");
      values[el.name] = el.value
    })
    return values;
  }
}

customElements.define('easy-form', EasyForm)


