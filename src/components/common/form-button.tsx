'use cliente';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

interface FormButtomProps {
  children: React.ReactNode;
}

export default function FormButton({ children }: FormButtomProps) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      {children}
    </Button>
  );
}
