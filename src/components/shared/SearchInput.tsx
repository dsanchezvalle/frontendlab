import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function SearchInput({ ...props }: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search articles, tags, or topics..."
        className="pl-10 h-10 text-base"
        {...props}
      />
    </div>
  );
}
