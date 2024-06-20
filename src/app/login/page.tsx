import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { login, signup, magicLinkLogin } from './actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    redirect('/');
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Card className='h-[400px] w-[400px]'>
        <CardHeader>Account</CardHeader>
        <CardContent className=''>
          <form className='flex flex-col gap-4 bg-white'>
            <div className=''>
              <Label htmlFor='email'>Email:</Label>
              <Input id='email' name='email' type='email' required />
            </div>
            <div>
              <Label htmlFor='password'>Password:</Label>
              <Input id='password' name='password' type='password' required />
            </div>
            <Button formAction={login}>Log in</Button>
            <Button formAction={signup}>Sign up</Button>
          </form>
        </CardContent>
      </Card>
      {/* <Card className='h-[400px] w-[400px]'> */}
      {/*   <CardHeader>Account</CardHeader> */}
      {/*   <CardContent className=''> */}
      {/*     <form className='flex flex-col gap-4 bg-white'> */}
      {/*       <div className=''> */}
      {/*         <Label htmlFor='email'>Email:</Label> */}
      {/*         <Input id='email' name='email' type='email' required /> */}
      {/*       </div> */}
      {/*       <Button formAction={magicLinkLogin} type='submit'> */}
      {/*         Log in */}
      {/*       </Button> */}
      {/*     </form> */}
      {/*   </CardContent> */}
      {/* </Card> */}
    </div>
  );
}
