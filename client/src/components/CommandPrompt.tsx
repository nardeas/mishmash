import * as DialogPrimitive from '@radix-ui/react-dialog';
import { styled, keyframes } from '../styled';
import { useEffect, useState } from 'react';
import { usePhoneModelStore } from './phone-model/hooks';

export default function CommandPrompt() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const setBackColor = usePhoneModelStore((s) => s.setBackColor);

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  function handleSubmit(event: any) {
    event.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      setBackColor('#0bd9d5');
    });
  }

  return (
    <DialogPrimitive.Root open={open}>
      <DialogPrimitive.Portal>
        <Overlay />
        <Content>
          <CommandPromptForm onSubmit={handleSubmit}>
            <CommandPromptInput
              placeholder="What would you like to generate?"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            {Boolean(value) && (
              <CommandPromptSubmitButton type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </CommandPromptSubmitButton>
            )}
          </CommandPromptForm>
        </Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

const show = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const CommandPromptForm = styled('form', {
  backgroundColor: '$elevated',
  border: 'none',
  outline: 'none',
  color: '$textMuted',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  paddingRight: 8,
});

const CommandPromptSubmitButton = styled('button', {
  color: '$textMuted',
  padding: '6px 8px',
  borderRadius: 4,
  border: '1px solid $muted5',
  animation: `${show} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
  svg: {
    width: 16,
    height: 16,
  },
});

const CommandPromptInput = styled('input', {
  border: 'none',
  width: '100%',
  padding: 16,
  outline: 'none',
  color: '$textMuted',
  background: 'transparent',
});

const Overlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$backdrop',
  position: 'fixed',
  inset: 0,
  animation: `${show} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  backdropFilter: 'blur(10px)',
});

const Content = styled(DialogPrimitive.Content, {
  border: '1px solid $muted5',
  minWidth: 400,
  backgroundColor: '$elevated',
  borderRadius: 8,
  boxShadow:
    '0 2px 8px rgba(255, 255, 255, 0.05), 0 12px 56px rgba(255, 255, 255, 0.1)',
  overflow: 'hidden',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
});
