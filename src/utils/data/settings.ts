export interface IPreferenciasOptions {
  id: number;
  navTitle: string;
  prefTitle: string;
  prefSubtitle: string;
  component: "interface-option" | "conta-option";
}

export const PreferenciasOptions: IPreferenciasOptions[] = [
  {
    id: 1,
    navTitle: "Interface",
    prefTitle: "Preferências da interface",
    prefSubtitle:
      "Configure a interface conforme sua necessidade. Tudo para deixar sua experiência mais confortável :)",
    component: "interface-option",
  },
  {
    id: 2,
    navTitle: "Conta",
    prefTitle: "Preferências da conta",
    prefSubtitle:
      "Altere os dados da sua conta. Siga as instruções para criação de uma nova senha.",
    component: "conta-option", // onclick change // change name to actual
  },
];
