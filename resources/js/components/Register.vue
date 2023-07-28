<template>
    <div class="container">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="card shadow">
                    <div class="card-body">
                        <h1 class="text-center">Register</h1>
                        <hr />
                        <div class="alert alert-danger" v-if="Object.keys(validationErrors).length > 0">
                            <ul class="mb-0">
                                <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                            </ul>
                        </div>
                        <form :key="formKey" @submit.prevent="register" method="post">
                            <div class="form-group">
                                <label for="name" class="font-weight-bold">Name</label>
                                <input type="text" name="name" v-model="user.name" id="name" placeholder="Enter name"
                                    class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="text" name="email" v-model="user.email" id="email" placeholder="Enter Email"
                                    class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="password" name="password" v-model="user.password" id="password"
                                    placeholder="Enter Password" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="password_confirmation" class="font-weight-bold">Confirm Password</label>
                                <input type="password" name="password_confirmation" v-model="user.password_confirmation"
                                    id="password_confirmation" placeholder="Enter Password" class="form-control" />
                            </div>
                            <div class="form-group text-center mt-4">
                                <button type="submit" :disabled="processing" class="btn btn-primary btn-block">
                                    {{ processing ? "Please wait" : "Register" }}
                                </button>
                            </div>
                            <div class="form-group text-center mt-2">
                                <label>Already have an account? <router-link :to="{ name: 'login' }">Login
                                        Now!</router-link></label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'register',
    data() {
        return {
            formKey: 0, // Inicializa la clave del formulario
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            processing: false,
            validationErrors: {},
        };
    },
    methods: {
        ...mapActions({
            signIn: 'auth/login'
        }),
        async register() {
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/register', this.user).then(response => {
                this.validationErrors = {}
                this.signIn()
            }).catch(({ response }) => {
                if (response.status === 422) {
                    this.validationErrors = response.data.errors
                } else {
                    this.validationErrors = {}
                    alert(response.data.message)
                }
            }).finally(() => {
                this.processing = false
            })
        }
    }
}
</script>