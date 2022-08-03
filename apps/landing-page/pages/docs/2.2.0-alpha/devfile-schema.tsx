import { JsonSchemaViewer, useCodeblock, Prose, LandingPageMeta as Meta } from '@devfile-web/core';
import { promises as fs } from 'node:fs';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import type { JSONSchema7 } from 'json-schema';

export interface DevfileSchemaProps {
  schema: JSONSchema7;
}

export function DevfileSchema(props: DevfileSchemaProps): JSX.Element {
  const { schema } = props;

  const { codeblock, setCodeblock } = useCodeblock();

  return (
    <>
      <Meta title="Devfile schema - Docs" description="Devfile schema" />
      <Prose>
        <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
          {schema.title}
        </h1>
        <p>{schema.description}</p>
      </Prose>
      <JsonSchemaViewer schema={schema} codeblock={codeblock} setCodeblock={setCodeblock} />
      <Prose>
        <h2>Additional resources</h2>
        <ul>
          <li>
            <Link href="/devfile-schema/2.2.0-alpha.json">Download the current JSON Schema</Link>
          </li>
        </ul>
      </Prose>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const schemaString = await fs.readFile(
    './apps/landing-page/public/devfile-schema/2.2.0-alpha.json',
    'utf8',
  );
  const schema = JSON.parse(schemaString) as JSONSchema7;

  return {
    props: {
      schema,
    },
  };
};

export default DevfileSchema;
