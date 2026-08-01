<script lang="ts">
	import type { ActionData } from "./$types";

	let { form }: { form: ActionData } = $props();

	let showPassword = $state(false);
</script>

<div class="login-page">
	<div class="container">
		<header class="hero">
			<img
				src="/images/logo.png"
				alt="Hadeva Bakes"
				width="72"
				height="72"
				class="logo"
			/>

			<h1>Welcome back 👋</h1>

			<p>
				Sign in to continue placing orders, tracking deliveries and managing
				your account.
			</p>
		</header>

		<form method="POST" class="auth-form">
			{#if form?.error}
				<div class="error">
					{form.error}
				</div>
			{/if}

			<div class="field">
				<label for="phone">Phone Number</label>

				<input
					id="phone"
					name="phone"
					type="tel"
					placeholder="0801 234 5678"
					autocomplete="username"
					value={form?.phone ?? ""}
					required
				/>
			</div>

			<div class="field">
				<label for="password">Password</label>

				<div class="password">
					<input
						id="password"
						name="password"
						type={showPassword ? "text" : "password"}
						placeholder="Enter your password"
						autocomplete="current-password"
						required
					/>

					<button
						type="button"
						class="eye"
						onclick={() => (showPassword = !showPassword)}
						aria-label={showPassword ? "Hide password" : "Show password"}
					>
						{#if showPassword}
							🙈
						{:else}
							👁️
						{/if}
					</button>
				</div>
			</div>

			<button class="submit" type="submit">
				Sign In
			</button>
		</form>

		<div class="divider">
			<span>OR</span>
		</div>

		<p class="bottom-text">
			Don't have an account?

			<a href="/signup">
				Create one
			</a>
		</p>
	</div>
</div>
<style>
	.login-page {
		min-height: 100dvh;
		padding: 2rem 1.5rem;
		display: flex;
		justify-content: center;
		background:
			radial-gradient(circle at top right, rgba(242, 102, 31, 0.08), transparent 35%),
			radial-gradient(circle at bottom left, rgba(242, 102, 31, 0.05), transparent 40%),
			var(--background, #1b130f);
	}

	.container {
		width: 100%;
		max-width: 430px;
		margin: auto;
	}

	.hero {
		text-align: center;
		margin-bottom: 2rem;
	}

	.logo {
		display: block;
		margin: 0 auto 1rem;
		border-radius: 20px;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
		color: #fff7f1;
	}

	.hero p {
		margin: .75rem auto 0;
		max-width: 320px;
		color: #bca394;
		font-size: .95rem;
		line-height: 1.6;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 1.2rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: .55rem;
	}

	label {
		font-size: .85rem;
		font-weight: 600;
		color: #d9b9a6;
	}

	input {
		width: 100%;
		height: 56px;
		padding: 0 1rem;
		box-sizing: border-box;
		border-radius: 16px;
		border: 1px solid rgba(242, 102, 31, .18);
		background: rgba(255,255,255,.03);
		color: #fff;
		font-size: .95rem;
		transition: .2s;
	}

	input::placeholder {
		color: #8e7667;
	}

	input:focus {
		outline: none;
		border-color: #f2661f;
		background: rgba(255,255,255,.05);
		box-shadow: 0 0 0 4px rgba(242,102,31,.12);
	}

	.password {
		position: relative;
	}

	.password input {
		padding-right: 3.5rem;
	}

	.eye {
		position: absolute;
		top: 50%;
		right: .9rem;
		transform: translateY(-50%);
		border: none;
		background: transparent;
		cursor: pointer;
		font-size: 1rem;
		opacity: .7;
		padding: 0;
	}

	.eye:hover {
		opacity: 1;
	}

	.submit {
		margin-top: .4rem;
		height: 56px;
		border: none;
		border-radius: 16px;
		background: linear-gradient(135deg, #f2661f, #df5410);
		color: white;
		font-size: 1rem;
		font-weight: 700;
		cursor: pointer;
		transition: .2s;
		box-shadow: 0 10px 24px rgba(242,102,31,.28);
	}

	.submit:hover {
		transform: translateY(-2px);
		box-shadow: 0 14px 30px rgba(242,102,31,.35);
	}

	.submit:active {
		transform: scale(.98);
	}

	.error {
		padding: .9rem 1rem;
		border-radius: 14px;
		background: rgba(220,38,38,.12);
		border: 1px solid rgba(220,38,38,.35);
		color: #ffb3b3;
		font-size: .9rem;
	}

	.divider {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 2rem 0 1.2rem;
		color: #7e6556;
		font-size: .8rem;
	}

	.divider::before,
	.divider::after {
		content: "";
		flex: 1;
		height: 1px;
		background: rgba(255,255,255,.08);
	}

	.bottom-text {
		text-align: center;
		color: #bca394;
		font-size: .92rem;
	}

	.bottom-text a {
		color: #f2661f;
		text-decoration: none;
		font-weight: 600;
	}

	.bottom-text a:hover {
		text-decoration: underline;
	}

	@media (max-width: 480px) {
		.login-page {
			padding: 1.5rem;
		}

		h1 {
			font-size: 1.75rem;
		}
	}
</style>
