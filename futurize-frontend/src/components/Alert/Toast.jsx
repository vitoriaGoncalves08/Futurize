import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

export const ToastError = ({ text = 'Error invalid' }) => {
    Toast.fire({
        icon: 'error',
        title: text,
    })
}

export const ToastSuccess = ({ text = 'Error invalid' }) => {

    Toast.fire({
        icon: 'success',
        title: text,
    })
}

export const ToastWarning = ({ text = 'Error invalid' }) => {

    Toast.fire({
        icon: 'warning',
        title: text,
    })
}


export const ToastInformation = ({ text = 'Error invalid' }) => {

    Toast.fire({
        icon: 'info',
        title: text,
    })
}


