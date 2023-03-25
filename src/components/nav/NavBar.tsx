import { Container } from "../Container";
import { NavButtons } from "./NavButtons";
import { UserAccountButton } from "./UserAccountButton";

export function NavBar() {
  return (
    <Container>
      <nav className={" flex justify-end p-2"}>
        <UserAccountButton />
        <div className={" p-1 "}>
          <NavButtons />
        </div>
      </nav>
    </Container>
  );
}
