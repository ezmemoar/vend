<template>
  <section
    class="w-full h-screen relative flex flex-col p-5 sm:p-0 sm:items-center sm:justify-center overflow-hidden"
  >
    <UCard class="sm:w-[45%] xl:w-[30%]">
      <div class="w-full p-4 sm:p-12.5 xl:p-17.5 space-y-8">
        <div class="space-y-5">
          <img
            src="~/assets/images/logo-v-primary.svg"
            alt="logo"
            class="mx-auto w-24"
          />

          <h2 class="text-center font-bold text-xl">Sign in</h2>
        </div>

        <UForm :state :schema class="space-y-5" @submit="handleSubmit">
          <UFormGroup name="username" label="Username">
            <UInput
              :disabled="status === 'pending' || profileStatus === 'pending'"
              v-model="state.username"
            />
          </UFormGroup>

          <UFormGroup name="password" label="Password">
            <BaseFormPassword
              :disabled="status === 'pending' || profileStatus === 'pending'"
              v-model="state.password"
            />
          </UFormGroup>

          <UButton
            :loading="status === 'pending' || profileStatus === 'pending'"
            :disabled="status === 'pending' || profileStatus === 'pending'"
            type="submit"
            label="Submit"
            block
          />
        </UForm>
      </div>
    </UCard>
  </section>
</template>

<script setup>
import { getProfile, postLogin } from "~/services/authService";

definePageMeta({
  layout: "blank",
});

const authStore = useAuthStore();

const { state, schema, data, status, refresh } = postLogin();
const {
  data: profileData,
  status: profileStatus,
  refresh: fetchProfile,
} = getProfile({}, true);

const handleSubmit = async () => {
  await refresh();
  authStore.setUser(data.value.data);

  // await fetchProfile();
  // authStore.setUser(profileData.value.data);

  navigateTo("/dashboard/pilkada");
};
</script>
