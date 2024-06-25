import { atom } from 'recoil';

export const IsEditingAtom = atom<boolean>({
	key: 'IsEditingAtom',
	default: false,
});
