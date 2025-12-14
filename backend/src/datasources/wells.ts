import { readFileSync } from "fs";
import { join } from "path";
import type { Well, WellsDataSource as WellsDataSourceInterface } from "../types.js";

const wellsData = readFileSync(join(process.cwd(), "data/wells.json"), "utf-8");
const wells = JSON.parse(wellsData) as Well[];

export class WellsDataSource implements WellsDataSourceInterface {
  private records: Well[];

  constructor() {
    this.records = wells;
  }

  getWells(): Well[] {
    return this.records;
  }

  getWellById(id: string): Well | undefined {
    return this.records.find((well) => well.id === id);
  }
}

