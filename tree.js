/** TreeNode: node for a general tree. */
class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    if (!this.root) {
      return 0;
    }

    let sum = 0;
    const stack = [this.root];

    while (stack.length) {
      const node = stack.pop();
      sum += node.val;
      stack.push(...node.children);
    }

    return sum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    if (!this.root) {
      return 0;
    }

    let count = 0;
    const stack = [this.root];

    while (stack.length) {
      const node = stack.pop();
      if (node.val % 2 === 0) {
        count++;
      }
      stack.push(...node.children);
    }

    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    if (!this.root) {
      return 0;
    }

    let count = 0;
    const stack = [this.root];

    while (stack.length) {
      const node = stack.pop();
      if (node.val > lowerBound) {
        count++;
      }
      stack.push(...node.children);
    }

    return count;
  }
}

module.exports = { Tree, TreeNode };
