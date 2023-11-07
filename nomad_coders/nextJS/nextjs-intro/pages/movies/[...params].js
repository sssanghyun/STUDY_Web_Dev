import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function Detail({params}) {
    const router = useRouter();
    const [title, id] = params || [];
    return <div>
        <Seo title={title}/>
        <h4>
            {title}
        </h4>
    </div>;
}

// URL에 검색된 파라미터를 얻을 수 있음. 그중 params 활용
export function getServerSideProps({params: {params}}) {
    console.log(params);
    return {
        props: {params},
    };
}