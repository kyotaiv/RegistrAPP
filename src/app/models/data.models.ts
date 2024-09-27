import { User } from "./bd.models";

export const userSimulated: User[]=[
  {
    username: 'admin',
    password: '123',
    typeUser: 1,
    fullName: "Administrador"
  },
  {
    username: 'IanIbacache',
    password: 'Ian123',
    typeUser: 2,
    fullName: "Ian Ibacache"
  },
  {
    username: 'BrianMartel',
    password: 'Brian123',
    typeUser: 3,
    fullName: "Brian Martel"
  },
];

export { User };

