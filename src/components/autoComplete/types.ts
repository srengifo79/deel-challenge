export type Suggestions = {
  id: string;
  label: string;
}[];

export type Props = {
  source: (search: string) => Promise<Suggestions>;
};
