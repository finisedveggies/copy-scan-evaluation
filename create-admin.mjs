import { createClient } from '@insforge/sdk';

const baseUrl = 'https://37y3xsb3.us-east.insforge.app';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3OC0xMjM0LTU2NzgtOTBhYi1jZGVmMTIzNDU2NzgiLCJlbWFpbCI6ImFub25AaW5zZm9yZ2UuY29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNTgxODh9.BgJMZpFG9ycP0I3J3M3Fxi6FkPBgZqYuuQbH-71b8Ks';

const insforge = createClient({ baseUrl, anonKey });

// ── Change these credentials as you like ──────────────────────────────────────
const EMAIL    = 'admin@evalproject.com';
const PASSWORD = 'Admin@123';
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📧 Creating teacher account: ${EMAIL} ...\n`);

  const { data, error } = await insforge.auth.signUp({ email: EMAIL, password: PASSWORD });

  if (error) {
    // If user already exists, try signing in instead
    if (error.message?.toLowerCase().includes('already')) {
      console.log('ℹ️  Account already exists. Trying to sign in...');
      const { data: loginData, error: loginError } = await insforge.auth.signInWithPassword({ email: EMAIL, password: PASSWORD });
      if (loginError) {
        console.error('❌ Sign-in error:', loginError.message);
      } else {
        console.log('✅ Account already exists and credentials are valid!\n');
        console.log('──────────────────────────────────────');
        console.log(`   URL:      http://localhost:5173/login`);
        console.log(`   Email:    ${EMAIL}`);
        console.log(`   Password: ${PASSWORD}`);
        console.log('──────────────────────────────────────\n');
      }
    } else {
      console.error('❌ Sign-up error:', error.message);
    }
    return;
  }

  console.log('✅ Account created successfully!\n');
  console.log('──────────────────────────────────────');
  console.log(`   URL:      http://localhost:5173/login`);
  console.log(`   Email:    ${EMAIL}`);
  console.log(`   Password: ${PASSWORD}`);
  console.log('──────────────────────────────────────');

  if (data?.user && !data.user.email_confirmed_at) {
    console.log('\n⚠️  Email verification is required.');
    console.log('   Check your inbox for a verification email from Insforge.');
    console.log('   If you did not receive it, check your spam folder.\n');
  } else {
    console.log('\n🚀 No verification needed — you can log in right now at http://localhost:5173/login\n');
  }
}

main().catch(console.error);
