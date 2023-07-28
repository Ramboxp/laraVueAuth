<template>
    <div class="container">
        <div class="row justify-content-center align-items-center min-vh-100">
            <div class="col-12 col-md-6">
                <div class="card shadow">
                    <div class="card-body">
                        <h2 class="text-center">Login</h2>
                        <div class="alert alert-danger" v-if="Object.keys(validationErrors).length > 0">
                            <ul class="mb-0">
                                <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                            </ul>
                        </div>
                        <form action="javascript:void(0)" method="post">
                            <div class="form-group">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="email" v-model="auth.email" name="aa" id="email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="password" v-model="auth.password" name="password" id="password"
                                    class="form-control">
                            </div>
                            <br>
                            <div class="mb-2">
                                <button type="submit" :disabled="processing" @click="login"
                                    class="btn btn-primary btn-block">
                                    {{ processing ? "Please wait" : "Login" }}
                                </button>
                            </div>
                            <div class="text-center">
                                <label>Not registered &#128558;? <router-link :to="{ name: 'register' }"> Register
                                        now!?</router-link></label>
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
    name: "login",
    data() {
        return {
            auth: {
                email: "",
                password: ""
            },
            validationErrors: {},
            processing: false
        }
    },
    methods: {
        ...mapActions({
            signIn: 'auth/login'
        }),
        async login() {
            this.processing = true
            await axios.get('/sanctum/csrf-cookie')
            await axios.post('/login', this.auth).then(({ data }) => {
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
        },
    }
}
</script>

<style>
.min-vh-100 {
    min-height: 100vh;
}
</style> 