<template>
  <Title :isContent="false" />
  <q-layout class="">
    <q-page-container>
      <q-page>
        <div class="col-4 profile">
          <q-img class="image profile__background" src="http://res.cloudinary.com/dlimuhee3/image/upload/v1710677278/fvl1vx4r4rz7zikepjae.png" :ratio="16 / 9" />
          <div class="profile__topic row">
            <div class="profile__topic--avatar">
              <q-img class="avatar" :src="staff.avatar" :ratio="4 / 3"/>
              <q-icon class="icon" name="add_a_photo" color="blue-1" style="font-size: 2rem"></q-icon>
            </div>
        
            <div class="profile__topic--fullName q-ml-xl text-h5  ">
              {{ staff.fullName }}
              
              <p>
                It is often used with other components in their slots.
              </p>
            </div>
          </div>
        </div>
        <div>
          <q-splitter
            v-model="splitterModel"
            style="height: 250px; margin-top: 15rem"
          >

            <template v-slot:before>
              <q-tabs
                v-model="tab"
                vertical
                class="text-teal"
              >
                <q-tab name="infor" icon="account_circle" label="Profile" />
                <q-tab name="alarms" icon="alarm" label="Alarms" />
                <q-tab name="movies" icon="movie" label="Movies" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="infor" class="infor">
                  <div class="text-h4 q-mb-md">Your profile</div>
                  <div class="infor__content row">
                      <div class="infor__content--form">
                        <q-input label="Full Name" class="item" v-model="staff.fullName"/>
                        <q-input label="Permission" class="q-mt-md item" v-model="permissions"  readonly/>
                      
                        <q-input label="Email" class="q-mt-md item" v-model="staff.email" />
                        <q-input label="Phone" class="q-mt-md item" v-model="staff.phone" />

                      </div>
                
                      <div class="infor__content--action content-end row"> 
                        <q-btn class="submit" label="Save" color="secondary"/>
                      </div>

                  </div>
                </q-tab-panel>

                <q-tab-panel name="alarms">
                  <div class="text-h4 q-mb-md">Alarms</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>

                <q-tab-panel name="movies">
                  <div class="text-h4 q-mb-md">Movies</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>
              </q-tab-panels>
            </template>

          </q-splitter>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Title from '@/views/admin/patials/Title.vue';
import { staff, permissions } from '@/helpers/admin/get-staff.helpers'
import { ref } from 'vue'

export default {
  name: 'Profile',
  components: {
    Title,
  },
  setup () {
    return {
      tab: ref('infor'),
      splitterModel: ref(20)
    }
  },
  data() {
    return {
      staff: staff(),
      permissions: permissions()
    }
  },

  methods: {

  },
  created() {

  }

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.cdnfonts.com/css/unbounded');

.profile {
  font-family: 'Unbounded', sans-serif;
  position: relative;
  &__topic {
    position: absolute;
    top: 75%;
    left: 10%;

    display: flex;
    align-items: center;

    &--avatar {
      width: 13rem;
      height: 13rem;
      border: 5px solid rgba(13, 175, 148, 0.7);
      border-radius: 100%;
      background: cover;
      position: relative;

      
      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
      
      .icon {
        position: absolute;
        bottom: 9%;
        right: -6%;
        width: 45px;
        height: 45px;
        display: flex;
        align-items: center;
        border: 2px solid rgba(13, 175, 148, 0.7);
        border-radius: 100%;
        background-color: rgba(13, 175, 148, 0.9);

      }

    }

    &--fullName {
      display: flex;
      flex-wrap: wrap;
      width: 60%;
      height: 9rem;
      text-align: center;
      display: flex;
      align-items: center;

      p {
        font-size: 1rem;
      }
       
    }
  }

}


  .infor {
    &__content {
      // background-color: red;
      justify-content: space-evenly;

      &--form {
        width: 60%;
        .item {

          width: 100%
        }

      }

      &--action {
        align-items: center;
        width: 30%;
        justify-content: center;

        .submit {
          width: 70%;
        }

      }
    }
  }


.image {
  width: 100%;
  height: 10rem;
  // background: cover;
}
</style>
