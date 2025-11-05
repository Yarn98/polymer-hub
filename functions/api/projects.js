/**
 * Cloudflare Pages Functions API
 * Endpoint: /api/projects
 *
 * Returns project metadata from KV store
 */

export async function onRequestGet(context) {
  try {
    // Check if KV binding is available
    if (!context.env.PROJECTS_KV) {
      // Return static projects if KV not configured yet
      return new Response(JSON.stringify({
        success: true,
        source: 'static',
        projects: getStaticProjects()
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300'
        }
      });
    }

    // Fetch from KV
    const projectsData = await context.env.PROJECTS_KV.get('projects', 'json');

    if (!projectsData) {
      // Return static projects as fallback
      return new Response(JSON.stringify({
        success: true,
        source: 'fallback',
        projects: getStaticProjects()
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60'
        }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      source: 'kv',
      projects: projectsData
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      projects: getStaticProjects()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

/**
 * Static projects fallback
 */
function getStaticProjects() {
  return [
    {
      id: 'p3hb-co-4hb',
      name: 'P(3HB-co-4HB) 물성 예측',
      description: 'Physics-informed 모델 기반 코폴리머 물성 예측 시스템. Fox Equation, Flory Theory, V-Shape Crystallinity 적용.',
      url: 'https://4hb-p34hb-properties-modeling.pages.dev/',
      category: ['prediction', 'simulation'],
      tags: ['Prediction', 'Physics', 'Interactive'],
      thumbnail: '📊',
      thumbnailGradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      featured: true,
      status: 'active'
    },
    {
      id: 'md-simulation',
      name: '분자동역학 시뮬레이션',
      description: '고분자 체인의 분자동역학 시뮬레이션 및 물성 분석 도구 (Coming Soon)',
      url: '#',
      category: ['simulation'],
      tags: ['MD', 'Simulation'],
      thumbnail: '🔬',
      thumbnailGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      featured: false,
      status: 'coming-soon'
    },
    {
      id: 'polymerization-optimization',
      name: '중합 반응 최적화',
      description: '머신러닝 기반 중합 조건 최적화 및 수율 예측 시스템 (Coming Soon)',
      url: '#',
      category: ['analysis'],
      tags: ['ML', 'Analysis'],
      thumbnail: '📈',
      thumbnailGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      featured: false,
      status: 'coming-soon'
    }
  ];
}
