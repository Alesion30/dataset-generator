export const csv2object = (text: string) => {
    const lines = text.split('\n')
    const results = lines.map((line) => {
      const [question, answer] = line.split(',')
      const result = {
        question: question,
        answer: answer
      }
      return result
    })
    return results
  }