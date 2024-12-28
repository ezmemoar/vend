<template>
  <div class="fixed sm:absolute top-10 right-10 z-10">
    <UCard :ui="{ body: { padding: 'p-1 sm:p-1' } }">
      <DarkModeSwitcher />
    </UCard>
  </div>

  <section
    class="w-full h-screen relative flex flex-col p-5 sm:p-0 sm:items-center sm:justify-center overflow-hidden"
  >
    <UCard class="sm:w-[45%] xl:w-[30%]">
      <div class="w-full p-4 sm:p-12.5 xl:p-17.5 space-y-8">
        <div class="space-y-5">
          <img src="~/assets/images/logo.svg" alt="logo" class="mx-auto w-24" />

          <h2 class="text-center font-bold text-xl">Sign in</h2>
        </div>

        <UForm :state :schema class="space-y-5" @submit="handleSubmit">
          <UFormGroup name="username" label="Username">
            <UInput :disabled="status === 'pending'" v-model="state.username" />
          </UFormGroup>

          <UFormGroup name="password" label="Password">
            <BaseFormPassword
              :disabled="status === 'pending'"
              v-model="state.password"
            />
          </UFormGroup>

          <UButton
            :loading="status === 'pending'"
            :disabled="status === 'pending'"
            type="submit"
            label="Submit"
            block
          />
        </UForm>
      </div>
    </UCard>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
  // middleware: "is-guest",
});

useSeoMeta({
  title: "Login",
});

let d = ref();

const authStore = useAuthStore();
const toast = useToast();

const { state, schema, run } = postLogin();
const { data, status, execute } = useAsyncData(() => run(), {
  immediate: false,
});

const handleSubmit = async () => {
  await execute();

  if (!data.value) return toast.add({ title: "Credential tidak ditemukan" });

  authStore.setCredentials(data.value);
  navigateTo("/dashboard/pilkada");
};
</script>
