export const skillData = {
  skills: [
    // 前端技术
    { id: 'frontend', name: '前端开发', level: 5, category: 'core' },
    { id: 'react', name: 'React', level: 5, category: 'frontend' },
    { id: 'vue', name: 'Vue', level: 4, category: 'frontend' },
    { id: 'typescript', name: 'TypeScript', level: 5, category: 'frontend' },
    { id: 'nextjs', name: 'Next.js', level: 4, category: 'frontend' },
    { id: 'tailwind', name: 'Tailwind CSS', level: 4, category: 'frontend' },
    
    // 后端技术
    { id: 'backend', name: '后端开发', level: 5, category: 'core' },
    { id: 'nodejs', name: 'Node.js', level: 4, category: 'backend' },
    { id: 'express', name: 'Express', level: 4, category: 'backend' },
    { id: 'nestjs', name: 'NestJS', level: 4, category: 'backend' },
    { id: 'postgresql', name: 'PostgreSQL', level: 4, category: 'backend' },
    { id: 'mongodb', name: 'MongoDB', level: 4, category: 'backend' },
    
    // Web3 技术
    { id: 'web3', name: 'Web3', level: 4, category: 'core' },
    { id: 'solidity', name: 'Solidity', level: 4, category: 'web3' },
    { id: 'ethers', name: 'Ethers.js', level: 4, category: 'web3' },
    { id: 'hardhat', name: 'Hardhat', level: 4, category: 'web3' },
    { id: 'ipfs', name: 'IPFS', level: 3, category: 'web3' },
    { id: 'defi', name: 'DeFi', level: 3, category: 'web3' },
    
    // 开发工具
    { id: 'devtools', name: '开发工具', level: 5, category: 'core' },
    { id: 'git', name: 'Git', level: 5, category: 'devtools' },
    { id: 'docker', name: 'Docker', level: 4, category: 'devtools' },
    { id: 'aws', name: 'AWS', level: 3, category: 'devtools' },
  ],
  
  links: [
    // 前端关联
    { source: 'frontend', target: 'react', strength: 0.8 },
    { source: 'frontend', target: 'vue', strength: 0.7 },
    { source: 'frontend', target: 'typescript', strength: 0.9 },
    { source: 'react', target: 'nextjs', strength: 0.8 },
    { source: 'frontend', target: 'tailwind', strength: 0.7 },
    
    // 后端关联
    { source: 'backend', target: 'nodejs', strength: 0.9 },
    { source: 'nodejs', target: 'express', strength: 0.8 },
    { source: 'nodejs', target: 'nestjs', strength: 0.8 },
    { source: 'backend', target: 'postgresql', strength: 0.7 },
    { source: 'backend', target: 'mongodb', strength: 0.7 },
    
    // Web3 关联
    { source: 'web3', target: 'solidity', strength: 0.9 },
    { source: 'web3', target: 'ethers', strength: 0.8 },
    { source: 'solidity', target: 'hardhat', strength: 0.8 },
    { source: 'web3', target: 'ipfs', strength: 0.6 },
    { source: 'web3', target: 'defi', strength: 0.7 },
    
    // 核心技能关联
    { source: 'frontend', target: 'backend', strength: 0.6 },
    { source: 'backend', target: 'web3', strength: 0.6 },
    { source: 'frontend', target: 'web3', strength: 0.6 },
    
    // 工具关联
    { source: 'devtools', target: 'git', strength: 0.9 },
    { source: 'devtools', target: 'docker', strength: 0.8 },
    { source: 'devtools', target: 'aws', strength: 0.7 },
  ]
}; 