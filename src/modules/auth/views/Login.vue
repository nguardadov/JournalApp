<template>
  <span class="login100-form-title p-b-41">
    Ingresar
  </span>
  <form
    class="login100-form validate-form p-b-33 p-t-5"
    @submit.prevent="onSubmit"
  >
    <div class="wrap-input100 validate-input" data-validate="Agregar Correo">
      <input
        class="input100"
        type="text"
        placeholder="Correo"
        required
        v-model="user.email"
      />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Agregar Password">
      <input
        class="input100"
        type="password"
        placeholder="Contraseña"
        required
        v-model="user.password"
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button class="login100-form-btn" type="submit">
        Login
      </button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{ name: 'register' }">¿No tienes cuenta?</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import useAuth from '../composables/useAuth'
export default {
  setup() {
    const router = useRouter()
    const { signInUser } = useAuth()
    const user = ref({
      email: '',
      password: '',
    })
    return {
      user,
      onSubmit: async () => {
        const { ok, message } = await signInUser(user.value)
        if (!ok) Swal.fire('Error', message, 'error')
        else router.push({ name: 'no-entry' })
      },
    }
  },
}
</script>
