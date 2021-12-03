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
              RegistarClientes();
              event.preventDefault()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
  
function RegistarClientes(){
    alert("Cliente Registrado");
    let documento = document.querySelector("#txtDocumento").value;
    let nombres = document.querySelector("#txtNombres").value;
    let apellidos = document.querySelector("#txtApellidos").value;
    let direccion = document.querySelector("#txtDireccion").value;
    let ciudad = document.querySelector("#txtCiudad").value;
    let email = document.querySelector("#txtCorreo").value;

    let url =`http://localhost:3000/clientes`;
    let datos ={
      documento: documento,
      nombres: nombres,
      apellidos: apellidos,
      direccion: direccion,
      ciudad: ciudad,
      email: email

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