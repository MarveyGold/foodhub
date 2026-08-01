<script lang="ts">
  import type { ActionData } from "./$types";
  let { form }: { form: ActionData } = $props();

  let showPassword = $state(false);
</script>

<div class="login-page">
  <div class="login-card">
    <div class="brand-row">
      <img src="/images/logo.png" alt="" width="36" height="36" />
      <span class="brand-name">Hadeva Bakes</span>
    </div>

    <h1>Create account</h1>
    <svg class="icing" viewBox="0 0 200 12" aria-hidden="true">
      <path
        d="M2 8 Q 14 0, 26 8 T 50 8 T 74 8 T 98 8 T 122 8 T 146 8 T 170 8 T 194 8"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
    <p class="subtext">Sign up to start ordering.</p>

    <form method="POST">
      {#if form?.error}
        <p class="error" role="alert">{form.error}</p>
      {/if}

      <label class="field">
        <span class="field-label">Full name</span>
        <input
          name="name"
          placeholder="Adesuwa Osaigbovo"
          value={form?.name ?? ""}
          required
        />
      </label>

      <label class="field">
        <span class="field-label">Email</span>
        <input
          name="email"
          type="email"
          placeholder="you@email.com"
          value={form?.email ?? ""}
          required
        />
      </label>

      <label class="field">
        <span class="field-label">Phone number</span>
        <input
          name="phone"
          type="tel"
          autocomplete="username"
          placeholder="080 000 0000"
          value={form?.phone ?? ""}
          required
        />
      </label>

      <label class="field">
        <span class="field-label">Password</span>
        <div class="password-wrap">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            minlength="8"
            autocomplete="new-password"
            required
          />
          <button
            type="button"
            class="toggle-visibility"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onclick={() => (showPassword = !showPassword)}
          >
            {#if showPassword}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.4 18.4 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            {:else}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            {/if}
          </button>
        </div>
      </label>

      <button type="submit" class="submit-btn">Create account</button>
    </form>

    <p class="register-link">
      Already have an account? <a href="/login">Sign in</a>
    </p>
  </div>
</div>

<style>
  .login-page {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: radial-gradient(circle at 20% 0%, #3a2317 0%, #1f1410 55%);
  }

  .login-card {
    width: 100%;
    max-width: 380px;
    background: #2a1b14;
    border: 1px solid rgba(242, 102, 31, 0.25);
    border-radius: 28px;
    padding: 32px 28px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  }

  .brand-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
  }

  .brand-name {
    font-family: var(--font-brand, inherit);
    font-weight: 700;
    font-size: 18px;
    color: #f2661f;
  }

  h1 {
    color: #fcefe3;
    font-size: 26px;
    font-weight: 700;
    margin: 0;
  }

  .icing {
    width: 120px;
    height: 12px;
    color: #f2661f;
    margin: 6px 0 10px;
  }

  .subtext {
    color: #c9a68c;
    font-size: 14px;
    margin: 0 0 24px;
  }

  .field {
    display: block;
    margin-bottom: 16px;
  }

  .field-label {
    display: block;
    font-size: 12px;
    color: #c9a68c;
    margin-bottom: 6px;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    background: #1f1410;
    border: 1px solid rgba(242, 102, 31, 0.3);
    border-radius: 14px;
    padding: 14px 16px;
    color: #fcefe3;
    font-size: 15px;
  }

  input::placeholder {
    color: #8a6d5a;
  }

  input:focus {
    outline: none;
    border-color: #f2661f;
    box-shadow: 0 0 0 3px rgba(242, 102, 31, 0.2);
  }

  .password-wrap {
    position: relative;
  }

  .password-wrap input {
    padding-right: 44px;
  }

  .toggle-visibility {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #c9a68c;
    cursor: pointer;
    padding: 4px;
    display: flex;
  }

  .toggle-visibility:hover {
    color: #f2661f;
  }

  .submit-btn {
    width: 100%;
    padding: 15px;
    margin-top: 8px;
    border: none;
    border-radius: 999px;
    background: linear-gradient(135deg, #f2661f, #d9490f);
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.1s;
  }

  .submit-btn:active {
    transform: scale(0.98);
  }

  .error {
    background: rgba(220, 38, 38, 0.12);
    border: 1px solid rgba(220, 38, 38, 0.4);
    color: #fca5a5;
    font-size: 13px;
    padding: 10px 12px;
    border-radius: 10px;
    margin-bottom: 16px;
  }

  .register-link {
    text-align: center;
    font-size: 13px;
    color: #c9a68c;
    margin: 20px 0 0;
  }

  .register-link a {
    color: #f2661f;
    font-weight: 600;
    text-decoration: none;
  }

  .register-link a:hover {
    text-decoration: underline;
  }
</style>
