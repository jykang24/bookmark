import { type FieldValues, Path,type UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props<T extends FieldValues, U> = {
  form: UseFormReturn<T, U>;
  name: Path<T>;
  label?: string;
  type: string;
  placeholder?: string;
};

export default function FormFieldInput<T extends FieldValues, U>({
  form,
  name,
  label,
  type,
  placeholder,
}: Props<T, U>) {
  return (
    <>
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            
            <FormControl>
              <Input
                {...field}
                type={type || 'text'}
                placeholder={placeholder || (label ? label+"..." : "")}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
