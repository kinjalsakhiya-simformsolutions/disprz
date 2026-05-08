# Modal Component Documentation

## Overview

The Modal component is a fully reusable, accessible, and customizable dialog component built with React, TypeScript, and Tailwind CSS. It follows the shadcn/ui pattern with composable sub-components.

## Features

- ✅ **Accessible** - ARIA attributes, focus management, keyboard navigation
- ✅ **Customizable** - Multiple sizes (sm, md, lg, xl) and styling options
- ✅ **Composable** - Modular sub-components for header, title, content, footer
- ✅ **Animated** - Smooth transitions and entrance animations
- ✅ **Flexible** - Backdrop click and escape key handling options
- ✅ **TypeScript** - Full type safety with proper interfaces

## Components

### Modal (Main Container)

The main modal wrapper that manages state, focus, and backdrop.

**Props:**

- `isOpen` (boolean) - Controls modal visibility
- `onClose` (function) - Callback when modal should close
- `children` (ReactNode) - Modal content
- `size` ('sm' | 'md' | 'lg' | 'xl') - Modal width, default: 'md'
- `closeOnBackdropClick` (boolean) - Close when clicking backdrop, default: true
- `closeOnEscape` (boolean) - Close with Escape key, default: true
- `className` (string, optional) - Additional CSS classes

**Example:**

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  size="md"
  closeOnBackdropClick={true}
  closeOnEscape={true}
>
  {/* Modal content */}
</Modal>
```

### ModalHeader

Header section typically containing title and close button.

**Props:**

- `children` (ReactNode) - Header content
- `className` (string, optional) - Additional CSS classes

**Example:**

```tsx
<ModalHeader>
  <ModalTitle>Modal Title</ModalTitle>
  <ModalCloseButton />
</ModalHeader>
```

### ModalTitle

Main heading for the modal.

**Props:**

- `children` (ReactNode) - Title text
- `className` (string, optional) - Additional CSS classes

**Example:**

```tsx
<ModalTitle>Delete User</ModalTitle>
```

### ModalDescription

Secondary description text.

**Props:**

- `children` (ReactNode) - Description text
- `className` (string, optional) - Additional CSS classes

**Example:**

```tsx
<ModalDescription>This action cannot be undone.</ModalDescription>
```

### ModalContent

Main content area of the modal.

**Props:**

- `children` (ReactNode) - Content
- `className` (string, optional) - Additional CSS classes

**Example:**

```tsx
<ModalContent>{/* Your content here */}</ModalContent>
```

### ModalFooter

Footer section for action buttons.

**Props:**

- `children` (ReactNode) - Footer content (usually buttons)
- `className` (string, optional) - Additional CSS classes

**Example:**

```tsx
<ModalFooter>
  <Button onClick={handleCancel}>Cancel</Button>
  <Button onClick={handleConfirm}>Delete</Button>
</ModalFooter>
```

### ModalCloseButton

Close button component (X icon from lucide-react).

**Props:**

- `onClick` (function, optional) - Override close behavior
- `className` (string, optional) - Additional CSS classes

**Example:**

```tsx
<ModalCloseButton />
```

## Usage Examples

### Basic Modal

```tsx
import { useState } from "react";
import { Button } from "../components/ui";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
} from "../components/ui";

export function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <ModalTitle>Hello World</ModalTitle>
          <ModalCloseButton />
        </ModalHeader>

        <ModalContent>
          <p>This is a simple modal.</p>
        </ModalContent>

        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### Confirmation Dialog

```tsx
export function ConfirmationModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log("Deleted!");
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Delete Item</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        size="sm"
        closeOnBackdropClick={false}
        closeOnEscape={false}
      >
        <ModalHeader>
          <ModalTitle>Delete Item?</ModalTitle>
        </ModalHeader>

        <ModalContent>
          <p>Are you sure? This action cannot be undone.</p>
        </ModalContent>

        <ModalFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### Form Modal

```tsx
import { useForm } from "react-hook-form";

export function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    setIsOpen(false);
    reset();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add User</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <ModalTitle>Add New User</ModalTitle>
          <ModalCloseButton />
        </ModalHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input {...register("name")} placeholder="John Doe" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </ModalContent>

          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add User</Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
```

### Sizes Example

```tsx
export function SizeExamples() {
  const [size, setSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <Button
            key={s}
            variant={size === s ? "default" : "outline"}
            onClick={() => {
              setSize(s);
              setIsOpen(true);
            }}
          >
            {s.toUpperCase()}
          </Button>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size={size}>
        <ModalHeader>
          <ModalTitle>Modal Size: {size.toUpperCase()}</ModalTitle>
          <ModalCloseButton />
        </ModalHeader>

        <ModalContent>
          <p>This modal is {size} sized.</p>
        </ModalContent>

        <ModalFooter>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

## Accessibility Features

The Modal component includes several accessibility features:

- **Focus Management**: Automatically traps focus inside modal and restores previous focus on close
- **Keyboard Navigation**: Press Escape to close (configurable)
- **ARIA Attributes**: `role="dialog"` and `aria-modal="true"` for screen readers
- **Semantic HTML**: Proper heading hierarchy with ModalTitle
- **Click Outside**: Prevents unintended closures with backdrop click toggle
- **Scroll Lock**: Prevents body scroll when modal is open

## Styling & Theming

The component uses your project's color tokens:

- `bg-card` - Modal background
- `text-foreground` - Main text color
- `text-muted` - Description text color
- `border-border` - Border color

These automatically adapt to light/dark mode based on your theme configuration.

## Customization

### Modify Modal Size Defaults

Edit the `sizeClasses` object in `Modal.tsx`:

```tsx
const sizeClasses = {
  sm: "w-full max-w-sm", // 384px
  md: "w-full max-w-md", // 448px
  lg: "w-full max-w-lg", // 512px
  xl: "w-full max-w-xl", // 576px
};
```

### Custom Styling

Add custom classes to any component:

```tsx
<Modal
  className="border-2 border-red-500 shadow-2xl"
  // ...
>
  {/* Content */}
</Modal>
```

### Animations

Modal animations are controlled by Tailwind's animation utilities. To customize, edit the Tailwind config and update the className in `Modal.tsx`:

```tsx
className={clsx(
  "animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-200"
)}
```

## Best Practices

1. **Always provide onClose handler** - Modal should be controlled by parent state
2. **Use ModalCloseButton in header** - Provides clear way to dismiss modal
3. **Disable backdrop close for destructive actions** - Set `closeOnBackdropClick={false}` for confirmations
4. **Keep content concise** - Modals should be focused and quick to use
5. **Use appropriate Button variants** - Use `destructive` for delete actions
6. **Compose instead of overloading** - Build complex modals from sub-components

## Troubleshooting

**Modal doesn't close with Escape key:**

- Check `closeOnEscape={true}` prop

**Scroll visible behind modal:**

- Component handles this automatically, check CSS specificity if custom styles override

**Focus not returning to trigger button:**

- Modal saves previous active element automatically

**Modal appears behind other elements:**

- Component uses `z-50` for modal and `z-50` for backdrop, check your app's z-index scale

## TypeScript Support

Full TypeScript support with proper prop types:

```tsx
import type {
  ModalProps,
  ModalHeaderProps,
  ModalTitleProps,
  ModalContentProps,
  ModalFooterProps,
  ModalCloseButtonProps,
} from "../components/ui/Modal";
```

## Performance Notes

- Modal uses React Context for internal state management
- Focus management is optimized with useRef
- Event listeners are properly cleaned up
- No unnecessary re-renders of backdrop

---

For more examples, see `src/components/ModalExample.tsx`
