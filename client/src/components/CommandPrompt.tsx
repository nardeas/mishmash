import * as DialogPrimitive from '@radix-ui/react-dialog';
import { styled, keyframes } from '../styled';
import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { api } from '../api';
import Spinner from './Spinner';

type Command = {
  match: (cmd: string) => void;
  action: (prompt: string) => Promise<void>;
};

export default function CommandPrompt() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const text = useStore((s) => s.text);
  const loading = useStore((s) => s.loading);
  const setBackColor = useStore((s) => s.setBackColor);
  const setWallpaper = useStore((s) => s.setWallpaper);
  const setText = useStore((s) => s.setText);
  const setReady = useStore((s) => s.setReady);
  const setLoading = useStore((s) => s.setLoading);

  const commands: Command[] = [
    // Create <adjective/None> video template: <text>
    // - match template in cmd
    {
      match: (cmd) => cmd.includes('template'),
      action: async () => setReady(),
    },
    // Create <adjective / None> text: <prompt>
    // ⁃ create text. Match when cmd contains text
    {
      match: (cmd) => cmd.includes('text'),
      action: (prompt) => {
        const fullPrompt = `
          ${text}

          ${prompt}

        `;
        return api.getTextContent({ prompt: fullPrompt }).then(({ result }) => {
          setText(result);
        });
      },
    },
    // Create <adjective / None> image: <prompt>
    // ⁃ create image. Match when cmd contains image
    {
      match: (cmd) => cmd.includes('image'),
      action: (prompt) => {
        return api.getImageFromText({ prompt }).then(({ result }) => {
          setWallpaper(`data:image/png;base64,${result[0]}`);
        });
      },
    },
    // Create voice-over: <gender>
    // - create audio track: match when cmd contains voice
    {
      match: (cmd) => cmd.includes('voice'),
      action: async (prompt) => console.log('> Create voice-over', prompt),
    },
    // Translate: <language>
    // - translate text and audio. Match when cmd contains translate
    {
      match: (cmd) => cmd.includes('translate'),
      action: async (prompt) => console.log('> Translate', prompt),
    },
    // Clear: text
    // ⁃ remove text and audio track
    {
      match: (cmd) => cmd.includes('clear'),
      action: async (prompt) => {
        if (prompt.includes('text')) {
          setText('');
        }
      },
    },
    // Delete
    // ⁃ delete all content
    {
      match: (cmd) => cmd.includes('delete'),
      action: async (prompt) => console.log('> Delete all content', prompt),
    },
    // Set color: <text>
    // ⁃ change color of the phone: match cmd with color and select color based on apple or coke
    {
      match: (cmd) => cmd.includes('set color'),
      action: async (prompt) => {
        if (prompt.includes('apple')) {
          setBackColor('#515c63');
        } else if (
          prompt.includes('coke') ||
          prompt.includes('cola') ||
          prompt.includes('coca')
        ) {
          setBackColor('#bb0107');
        }
      },
    },
  ];

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

  async function handleSubmit(event: any) {
    event.preventDefault();

    const [cmd, prompt] = value.split(':');
    const command = commands.find((c) => c.match(cmd.toLowerCase()));

    if (command) {
      setLoading(true);
      await command.action(prompt.toLowerCase());
      setLoading(false);
    }

    setOpen(false);
    setValue('');
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
              disabled={loading}
              onChange={(e) => setValue(e.target.value)}
            />

            {Boolean(value) && (
              <CommandPromptSubmitButton type="submit">
                {loading ? (
                  <Spinner />
                ) : (
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
                )}
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
  height: 40,
  width: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
  '&:disabled': {
    opacity: 0.2,
  },
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
