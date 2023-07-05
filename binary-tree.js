/** BinaryTreeNode: node for a general tree. */
class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth() {
    if (!this.root) {
      return 0;
    }

    const queue = [[this.root, 1]];

    while (queue.length) {
      const [node, depth] = queue.shift();

      if (!node.left && !node.right) {
        // Found a leaf node
        return depth;
      }

      if (node.left) {
        queue.push([node.left, depth + 1]);
      }

      if (node.right) {
        queue.push([node.right, depth + 1]);
      }
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth() {
    if (!this.root) {
      return 0;
    }

    const queue = [[this.root, 1]];
    let maxDepth = 0;

    while (queue.length) {
      const [node, depth] = queue.shift();
      maxDepth = Math.max(maxDepth, depth);

      if (node.left) {
        queue.push([node.left, depth + 1]);
      }

      if (node.right) {
        queue.push([node.right, depth + 1]);
      }
    }

    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    let result = 0;

    function maxSumHelper(node) {
      if (node === null) return 0;
      const leftSum = maxSumHelper(node.left);
      const rightSum = maxSumHelper(node.right);
      result = Math.max(result, node.val + leftSum + rightSum);
      return Math.max(0, leftSum + node.val, rightSum + node.val);
    }

    maxSumHelper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    if (!this.root) {
      return null;
    }

    let nextLarger = null;
    const stack = [];
    let node = this.root;

    while (node || stack.length) {
      while (node) {
        stack.push(node);
        node = node.left;
      }

      node = stack.pop();

      if (node.val > lowerBound) {
        if (nextLarger === null || node.val < nextLarger) {
          nextLarger = node.val;
        }
      }

      node = node.right;
    }

    return nextLarger;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents.) */
  areCousins(node1, node2) {
    if (node1 === this.root || node2 === this.root) return false;

    function findLevelAndParent(
      nodeToFind,
      currentNode,
      level = 0,
      data = { level: 0, parent: null }
    ) {
      if (data.parent) return data;
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }
      if (currentNode.left) {
        findLevelAndParent(nodeToFind, currentNode.left, level + 1, data);
      }
      if (currentNode.right) {
        findLevelAndParent(nodeToFind, currentNode.right, level + 1, data);
      }
      return data;
    }

    let node1Info = findLevelAndParent(node1, this.root);
    let node2Info = findLevelAndParent(node2, this.root);

    let sameLevel =
      node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents =
      node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */
  static serialize(tree) {
    if (!tree.root) {
      return "";
    }

    const values = [];

    const preorder = (node) => {
      if (!node) {
        values.push("#");
        return;
      }

      values.push(node.val);
      preorder(node.left);
      preorder(node.right);
    };

    preorder(tree.root);

    return values.join(",");
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(stringTree) {
    if (!stringTree) {
      return new BinaryTree();
    }

    const values = stringTree.split(",");
    let index = 0;

    const preorder = () => {
      if (values[index] === "#") {
        index++;
        return null;
      }

      const node = new BinaryTreeNode(Number(values[index]));
      index++;
      node.left = preorder();
      node.right = preorder();

      return node;
    };

    const root = preorder();

    return new BinaryTree(root);
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    if (!this.root || !this._isNodePresent(this.root, node1) || !this._isNodePresent(this.root, node2)) {
      return null;
    }

    return this._lowestCommonAncestorHelper(this.root, node1, node2);
  }

  _isNodePresent(root, targetNode) {
    if (!root) {
      return false;
    }

    if (root === targetNode) {
      return true;
    }

    return this._isNodePresent(root.left, targetNode) || this._isNodePresent(root.right, targetNode);
  }

  _lowestCommonAncestorHelper(root, node1, node2) {
    if (!root || root === node1 || root === node2) {
      return root;
    }

    const left = this._lowestCommonAncestorHelper(root.left, node1, node2);
    const right = this._lowestCommonAncestorHelper(root.right, node1, node2);

    if (left && right) {
      return root;
    }

    return left || right;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
