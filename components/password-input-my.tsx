import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { InputProps } from "@/components/ui/input";


export function MyPasswordInput({ className, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
        className={cn("pr-10", className)}
        placeholder="••••••••" 
      />
      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer select-none ">
        {showPassword ? (
          <EyeIcon onClick={() => setShowPassword(false)} />
        ) : (
          <EyeOffIcon onClick={() => setShowPassword(true)} />
        )}
      </span>
    </div>
  );
}
