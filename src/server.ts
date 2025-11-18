import { Server } from "http";
import app from "./app";

import config from "./app/config";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const port = config.port || 3000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`Excellence server running on port ${port}`);
  });
}

main();

app.use(globalErrorHandler);

app.use(notFound);
