// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }else{
              RegistarMascota();
              event.preventDefault()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
  
function RegistarMascota(){
    alert("todo ok");
    let nombre = document.querySelector("#txtNombre").value;
    let especie = document.querySelector("#txtEspecie").value;
    let raza = document.querySelector("#txtRaza").value;
    let color = document.querySelector("#txtColor").value;
    let sexo = document.querySelector("#txtSexo").value;
    //let peso = document.querySelector("#txtCorreo").value;
    //let enfermedadesPre = document.querySelector("#txt").value;      
    //let enfermedadesDescrip = document.querySelector("#txt").value;      
    //let fechaNacimiento = document.querySelector("#txt").value;  
    //let estadoPlan = document.querySelector("#txt").value;
    //let rescindido = document.querySelector("#txt").value;
    //let motivoRescindido = document.querySelector("#txt").value;      
    //let historiales = document.querySelector("#txt").value;     

    let url =`http://localhost:3000/mascotas`;
    let datos ={
       nombre: nombre,
       especie: especie,
       raza: raza,
       color: color,
       sexo: sexo,
    };
  
    fetch(url, {
        method:'POST',
         //body: datos,
        body: JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res => res.json())
    .then(mensaje => {
        console.log(mensaje)
    })     
  }