<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div class="text-h6">SysABA</div>
      </q-toolbar>
    </q-header>

    <q-page-container>

      <div class="row justify-center q-mt-xl">
        <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
          <div class="q-pa-md q-gutter-sm">


            <a href="#" class="social-button" id="facebook-connect" @click="entrar('facebook')"> <span>Entrar com
                Facebook</span></a>

            <button class="google-button" @click="entrar('google')">
              <div class="google-icon-wrapper">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48">
                  <g>
                    <path fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z">
                    </path>
                    <path fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z">
                    </path>
                    <path fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z">
                    </path>
                    <path fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
                    </path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg>
              </div>
              <span class="google-button-text">ENTRAR COM GOOGLE</span>
            </button>

            <div class="container">
              <div class="text-center q-mt-md text-body1">ou entre com</div>
            </div>

            <q-input outlined v-model="email" label="E-mail" stack-label
              :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Senha é obrigatória' : true]" />

            <q-input outlined v-model="senha" label="Senha" stack-label type="password"
              :rules="[(val) => isSubmitted ? (val && val.length > 0) || 'Senha é obrigatória' : true]" />

            <q-btn class="full-width bg-primary text-white q-pa-sm" size="18px" label="Entrar" @click="entrar('normal')"
              :disable="!isSubmitted" />

            <q-btn class="full-width text-teal text-h6" color="white" text-color="blue" unelevated to="/cadastrar"
              label="Cadastrar-se" no-caps />
            <q-btn class="full-width text-teal text-body1" color="white" text-color="blue" unelevated to="/esqueci"
              label="Esqueci a senha" no-caps />

          </div>
        </div>
      </div>

    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import useAuth from 'src/composables/useAuth';
import { useRouter } from 'vue-router';
import useNotify from 'src/composables/UseNotify';


export type Provider = 'google' | 'facebook' | 'normal';

const service = useAuth();

const { error } = useNotify();

const email = ref('');

const senha = ref('');

const router = useRouter();

let isSubmitted = computed(() => {
  return email.value !== '' && senha.value !== '' && senha.value.length > 5 && senha.value !== null;
});

function entrar(provider: Provider) {
  service.login(email.value.trim(), senha.value.trim(), provider).then(() => {
    router.push({ name: 'relatorios' })
  }).catch((_error) => {
    console.error(_error);
    error('Erro ao logar. Verifique suas credenciais');
  })
}

</script>
<style scoped>
.google-button {
  all: unset;

  margin: auto;
  width: 100%;
  height: 52px;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  transition: all 300ms ease-in-out;
  display: flex;
  justify-content: space-between;

  .google-icon-wrapper {
    margin: 1px;
    width: 50px;
    height: 50px;
    border-radius: 1px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .google-button-text {
    display: flex;
    color: #ffffff;
    font-size: 16px;
    letter-spacing: 0.2px;
    font-family: "Roboto";
    margin-left: 1em;
    margin-right: 4em;
    align-items: center;
  }

  &:hover {
    box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
    cursor: pointer;
  }

  &:active {
    background: #3367d6;
  }
}


html * {
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
}

body {
  background: #4688F1;
  padding: 0;
  margin: 0;
}

.login-box {
  background: #fff;
  padding: 20px;
  max-width: 480px;
  margin: 25vh auto;
  text-align: center;
  letter-spacing: 1px;
  position: relative;
}

.login-box:hover {
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.login-box h2 {
  margin: 20px 0 20px;
  padding: 0;
  text-transform: uppercase;
  color: #4688F1;
}

.social-button {
  background-position: 25px 0px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  cursor: pointer;
  display: inline-block;
  height: 50px;
  line-height: 50px;
  text-align: left;
  text-decoration: none;
  text-transform: uppercase;
  vertical-align: middle;
  width: 100%;
  border-radius: 3px;
  margin: 10px auto;
  outline: rgb(255, 255, 255) none 0px;
  padding-left: 20%;
  transition: all 0.2s cubic-bezier(0.72, 0.01, 0.56, 1) 0s;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
}

#facebook-connect {
  background: rgb(255, 255, 255) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/facebook.svg?sanitize=true') no-repeat scroll 5px 0px / 30px 50px padding-box border-box;
  border: 1px solid rgb(60, 90, 154);
}

#facebook-connect {
  border-color: rgb(60, 90, 154);
  background: rgb(60, 90, 154) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/facebook-white.svg?sanitize=true') no-repeat scroll 5px 0px / 30px 50px padding-box border-box;
  -webkit-transition: all .8s ease-out;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease-out;
}

#facebook-connect span {
  box-sizing: border-box;
  color: rgb(60, 90, 154);
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  border: 0px none rgb(255, 255, 255);
  outline: rgb(255, 255, 255) none 0px;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

#facebook-connect span {
  color: #FFF;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

#google-connect {
  background: rgb(255, 255, 255) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/google-plus.png') no-repeat scroll 5px 0px / 50px 50px padding-box border-box;
  border: 1px solid rgb(220, 74, 61);
}

#google-connect {
  border-color: rgb(220, 74, 61);
  background: rgb(220, 74, 61) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/google-plus-white.png') no-repeat scroll 5px 0px / 50px 50px padding-box border-box;
  -webkit-transition: all .8s ease-out;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease-out;
}

-->#google-connect span {
  box-sizing: border-box;
  color: rgb(220, 255, 255);
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  border: 0px none rgb(220, 74, 61);
  outline: rgb(255, 255, 255) none 0px;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

#google-connect:hover span {
  color: #FFF;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

#twitter-connect {
  background: rgb(255, 255, 255) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/twitter.png') no-repeat scroll 5px 1px / 45px 45px padding-box border-box;
  border: 1px solid rgb(85, 172, 238);
}

#twitter-connect:hover {
  border-color: rgb(85, 172, 238);
  background: rgb(85, 172, 238) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/twitter-white.png') no-repeat scroll 5px 1px / 45px 45px padding-box border-box;
  -webkit-transition: all .8s ease-out;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease-out;
}

#twitter-connect span {
  box-sizing: border-box;
  color: rgb(85, 172, 238);
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  border: 0px none rgb(220, 74, 61);
  outline: rgb(255, 255, 255) none 0px;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

#twitter-connect:hover span {
  color: #FFF;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

#linkedin-connect {
  background: rgb(255, 255, 255) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/linkedin.svg?sanitize=true') no-repeat scroll 13px 0px / 28px 45px padding-box border-box;
  border: 1px solid rgb(0, 119, 181);
}

#linkedin-connect:hover {
  border-color: rgb(0, 119, 181);
  background: rgb(0, 119, 181) url('https://raw.githubusercontent.com/eswarasai/social-login/master/img/linkedin-white.svg?sanitize=true') no-repeat scroll 13px 0px / 28px 45px padding-box border-box;
  -webkit-transition: all .8s ease-out;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease-out;
}

#linkedin-connect span {
  box-sizing: border-box;
  color: rgb(0, 119, 181);
  cursor: pointer;
  text-align: center;
  text-transform: uppercase;
  border: 0px none rgb(0, 119, 181);
  outline: rgb(255, 255, 255) none 0px;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

#linkedin-connect:hover span {
  color: #FFF;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

#facebook-connect span,
#google-connect span {
  font-family: 'Roboto', sans-serif;
  /* Define a fonte */
  font-size: 16px;
  /* Define o tamanho da fonte */
  text-align: center;
  /* Define o alinhamento do texto */
}

.centered-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  /* Ajuste de acordo com suas necessidades */
}
</style>