export class MaxHeap {
  private array: number[];

  constructor(values: number[]) {
    this.array = [...values];
    const hasChildrenIndex = Math.floor(this.array.length / 2);
    for (let i = hasChildrenIndex; i >= 0; i--) {
      this.heapify(i);
    }
  }

  private getLeftIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightIndex(index: number): number {
    return 2 * index + 2;
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLastIndex(): number {
    return this.array.length - 1;
  }

  private getLargestChildIndex(index: number): number {
    const lastIndex = this.getLastIndex();
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (leftIndex > lastIndex && rightIndex > lastIndex) {
      return -1;
    }
    const leftChild = this.array[leftIndex] ?? Number.MIN_VALUE;
    const rightChild = this.array[rightIndex] ?? Number.MIN_VALUE;
    return leftChild < rightChild ? rightIndex : leftIndex;
  }

  private swapNodes(i1: number, i2: number) {
    const tmp = this.array[i1];
    this.array[i1] = this.array[i2];
    this.array[i2] = tmp;
  }

  /**
   * Moves the specified node down the tree until heap condition will be satisfied
   */
  private heapify(index: number) {
    let currIndex = index;
    let largestChildIndex = this.getLargestChildIndex(currIndex);
    while (
      largestChildIndex !== -1 &&
      this.array[currIndex] < this.array[largestChildIndex]
    ) {
      this.swapNodes(currIndex, largestChildIndex);
      currIndex = largestChildIndex;
      largestChildIndex = this.getLargestChildIndex(currIndex);
    }
  }

  public add(val: number) {
    this.array.push(val);
    // now we need to lift new value until heap condition will be satisfied
    let currIndex = this.getLastIndex();
    let parentIndex = this.getParentIndex(currIndex);
    while (currIndex > 0 && this.array[currIndex] > this.array[parentIndex]) {
      this.swapNodes(currIndex, parentIndex);
      currIndex = parentIndex;
      parentIndex = this.getParentIndex(currIndex);
    }
  }

  public pop(): number | null {
    if (this.getSize() === 0) {
      return null;
    }
    const max = this.array.shift()!;
    this.heapify(0);
    return max;
  }

  public peek(): number | null {
    return this.array[0] ?? null;
  }

  public getSize(): number {
    return this.array.length;
  }

  public toString(): string {
    return this.array.toString();
  }
}
