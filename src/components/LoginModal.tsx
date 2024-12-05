import { LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { toast } from '@/hooks/use-toast';
import { account } from '@/lib/appwrite';

export default function LoginModal() {
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    if (!email) return toast({ title: 'Error!', description: 'Please enter an email. ', variant: 'destructive' });

    // Send magic link. Even if the user is not registered, the magic link will create an account.
    try {
      await account.createEmailToken;

      toast({ title: 'Success!', description: 'Magic link sent. Check your email. ' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error!', description: 'Something went wrong. ', variant: 'destructive' });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Login</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Enter your email to get started to sync your data across multiple devices.</DialogDescription>
          </DialogHeader>

          <form className='flex gap-1 items-center' onSubmit={submit}>
            <Input type='email' name='email' placeholder='Email' />
            <Button type='submit' variant='outline' size='icon'>
              <LogIn />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
