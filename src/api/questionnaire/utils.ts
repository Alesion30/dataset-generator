export const csv2object = (text: string) => {
  const lines = text.split("\n");
  const results = lines.map((line) => {
    const [question, answer] = line.split(",");
    const result = {
      question: question,
      answer: answer,
    };
    return result;
  });
  return results;
};

export const parseCSV = (csvString: string): object[] => {
  const lines = csvString.split("\n");
  const headers = lines[0].split(",");

  const result = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue; // 空行をスキップ

    const values = line.split(",");
    const obj = {};

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      const value = values[j];
      // @ts-ignore
      obj[header] = value;
    }
    result.push(obj);
  }

  return result;
};
