import {
  AppShell,
  Center,
  Text,
  Footer,
  Header,
  Navbar,
  useMantineTheme,
} from "@mantine/core";
import HomePage from "./HomePage";
import "./App.css";

function App() {
  const theme = useMantineTheme();
  return (
    <Center
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <Text>Application navbar</Text>
          </Navbar>
        }
        footer={
          <Footer height={60} p="md">
            Because of the poor design of this website, you may need to clear
            the canvas the first time you load the website if it is all black.
          </Footer>
        }
        header={
          <Header height={70} p="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                flexDirection: "column",
              }}
            >
              <Text>MNIST MODEL DEMO</Text>
              <Text color="dimmed">
                Our measly model predicts your drawn number correctly about 50%
                of the time. It is truly one of the greatest innovations of
                modern society.
              </Text>
            </div>
          </Header>
        }
      >
        <HomePage />
      </AppShell>
    </Center>
  );
}

export default App;
