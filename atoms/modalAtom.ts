import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const storyViewState = atom({
  key: 'storyViewState',
  default: false,
});

export const welcomeMessageState = atom({
  key: 'welcomeMessageState',
  default: true,
});
